package ru.khkhlv;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import ru.khkhlv.messenger.model.Message;
import ru.khkhlv.messenger.repository.MessageRepo;
import ru.khkhlv.messenger.service.MessageService;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MessageServiceTest {

    @Mock
    private MessageRepo messageRepository;

    @InjectMocks
    private MessageService messageService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSendMessage() {
        // Настройка мока
        when(messageRepository.save(any(Message.class))).thenAnswer(invocation -> {
            Message msg = invocation.getArgument(0);
            return msg; // Возвращаем модифицированный объект из сервиса
        });

        // Вызов метода
        Message result = messageService.sendMessage("Alice", "Bob", "Hello, Bob!");

        // Проверки
        assertNotNull(result);
        assertEquals("Alice", result.getSender());
        assertEquals("Bob", result.getRecipient());
        assertEquals("Hello, Bob!", result.getContent());
        assertNotNull(result.getTimestamp());

        verify(messageRepository, times(1)).save(any(Message.class));
    }

    @Test
    void testGetMessagesForUser() {
        Message message = new Message();
        when(messageRepository.findByRecipientOrderByTimestampAsc("Bob"))
                .thenReturn(Collections.singletonList(message));

        List<Message> result = messageService.getMessagesForUser("Bob");

        assertEquals(1, result.size());
    }

    @Test
    void testDeleteMessage_ValidId() {
        doNothing().when(messageRepository).deleteById(1L);

        assertDoesNotThrow(() -> messageService.deleteMessage(1L));
        verify(messageRepository).deleteById(1L);
    }

    @Test
    void testDeleteMessage_InvalidId() {
        assertThrows(IllegalArgumentException.class, () -> {
            messageService.deleteMessage(-1L);
        });
    }

    @Test
    void testGetMessageById_Found() {
        Message message = new Message();
        when(messageRepository.findById(1L)).thenReturn(Optional.of(message));

        Message result = messageService.getMessageById(1L);

        assertNotNull(result);
    }

    @Test
    void testGetMessageById_NotFound() {
        when(messageRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            messageService.getMessageById(999L);
        });
    }

    @Test
    void testSearchMessages() {
        Message message = new Message();
        message.setContent("test");
        when(messageRepository.findByContentContainingIgnoreCase("test"))
                .thenReturn(Collections.singletonList(message));

        List<Message> result = messageService.searchMessages("test");

        assertEquals(1, result.size());
        assertEquals("test", result.get(0).getContent());
    }

    @Test
    void testGetAllMessages() {
        when(messageRepository.findAll()).thenReturn(Arrays.asList(new Message(), new Message()));

        List<Message> result = messageService.getAllMessages();

        assertEquals(2, result.size());
    }
}
