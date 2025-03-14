package ru.khkhlv.messenger.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import ru.khkhlv.messenger.model.Message;
import ru.khkhlv.messenger.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(
        origins = "http://localhost:3000",
        methods = {RequestMethod.POST}
)
@RequestMapping("/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestParam("sender") String sender,
                                               @RequestParam("recipient") String recipient,
                                               @RequestParam("content") String content) {
        try {
            Message message = messageService.sendMessage(sender, recipient, content);
            return ResponseEntity.ok(message);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{recipient}")
    @CrossOrigin(
            origins = "http://localhost:3000",
            methods = {RequestMethod.GET}
    )
    public List<Message> getMessages(@PathVariable("recipient") String recipient) {
        return messageService.getMessagesForUser(recipient);
    }

    @GetMapping("/message/{id}")
    @CrossOrigin(
            origins = "http://localhost:3000",
            allowedHeaders = "*",
            methods = {RequestMethod.GET}
    )
    public Message getMessage(@PathVariable("id") Long id) {
        return messageService.getMessageById(id);
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(
            origins = "http://localhost:3000",
            allowedHeaders = "*",
            methods = {RequestMethod.DELETE}
    )
    public String deleteMessage(@PathVariable("id") Long id) {
        System.out.println("Deleting message with ID: " + id);
        messageService.deleteMessage(id);
        return "Message with ID " + id + " has been deleted.";
    }

    @GetMapping("/all")
    @CrossOrigin(
            origins = "http://localhost:3000",
            allowedHeaders = "*",
            methods = {RequestMethod.GET}
    )
    public List<Message> getAllMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping("/search")
    @CrossOrigin(
            origins = "http://localhost:3000",
            allowedHeaders = "*",
            methods = {RequestMethod.GET}
    )
    public List<Message> searchMessages(@RequestParam("keyword") String keyword) {
        return messageService.searchMessages(keyword);
    }
}
