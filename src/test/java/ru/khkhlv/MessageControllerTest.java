package ru.khkhlv;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import ru.khkhlv.messenger.controller.MessageController;
import ru.khkhlv.messenger.model.Message;
import ru.khkhlv.messenger.service.MessageService;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class MessageControllerTest {

    private MockMvc mockMvc;

    @Mock
    private MessageService messageService;

    @InjectMocks
    private MessageController messageController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(messageController).build();
    }

    @Test
    void testSendMessage_Success() throws Exception {
        Message message = new Message();
        message.setSender("Alice");
        message.setRecipient("Bob");
        message.setContent("Hello");
        message.setTimestamp(LocalDateTime.now());

        when(messageService.sendMessage("Alice", "Bob", "Hello")).thenReturn(message);

        mockMvc.perform(post("/messages/send")
                        .param("sender", "Alice")
                        .param("recipient", "Bob")
                        .param("content", "Hello"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sender").value("Alice"))
                .andExpect(jsonPath("$.content").value("Hello"));
    }

    @Test
    void testSendMessage_Failure() throws Exception {
        when(messageService.sendMessage(any(), any(), any()))
                .thenThrow(new RuntimeException("Database error"));

        mockMvc.perform(post("/messages/send")
                        .param("sender", "Alice")
                        .param("recipient", "Bob")
                        .param("content", "Hello"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    void testGetMessagesForUser() throws Exception {
        Message message = new Message();
        message.setRecipient("Bob");
        when(messageService.getMessagesForUser("Bob")).thenReturn(Collections.singletonList(message));

        mockMvc.perform(get("/messages/Bob"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].recipient").value("Bob"));
    }

    @Test
    void testGetMessageById() throws Exception {
        Message message = new Message();
        message.setId(1L);
        when(messageService.getMessageById(1L)).thenReturn(message);

        mockMvc.perform(get("/messages/message/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void testDeleteMessage() throws Exception {
        doNothing().when(messageService).deleteMessage(1L);

        mockMvc.perform(delete("/messages/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Message with ID 1 has been deleted."));
    }

    @Test
    void testGetAllMessages() throws Exception {
        Message message = new Message();
        when(messageService.getAllMessages()).thenReturn(Collections.singletonList(message));

        mockMvc.perform(get("/messages/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    void testSearchMessages() throws Exception {
        Message message = new Message();
        message.setContent("test");
        when(messageService.searchMessages("test")).thenReturn(Collections.singletonList(message));

        mockMvc.perform(get("/messages/search")
                        .param("keyword", "test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].content").value("test"));
    }
}

