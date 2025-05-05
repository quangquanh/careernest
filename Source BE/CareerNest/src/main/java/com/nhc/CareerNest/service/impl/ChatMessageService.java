package com.nhc.CareerNest.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.entity.ChatMessage;
import com.nhc.CareerNest.repository.ChatMessageRepository;
import com.nhc.CareerNest.service.IChatMessageService;

@Service
public class ChatMessageService implements IChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomService chatRoomService;

    public ChatMessageService(
            ChatMessageRepository chatMessageRepository,
            ChatRoomService chatRoomService) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatRoomService = chatRoomService;
    }

    @Override
    public ChatMessage save(ChatMessage chatMessage) {

        var chatRoom = chatRoomService.getChatRoomName(
                chatMessage.getSender().getId(),
                chatMessage.getReceiver().getId(),
                true);
        chatMessage.setRoomName(chatRoom);
        this.chatMessageRepository.save(chatMessage);
        return chatMessage;
    }

    @Override
    public List<ChatMessage> findChatMessages(
            Long senderId,
            Long recipientId) {
        var chatroomName = chatRoomService.getChatRoomName(senderId, recipientId, false);
        List<ChatMessage> chatList = new ArrayList<>();
        chatList = this.chatMessageRepository.findByRoomName(chatroomName);
        return chatList;
    }

}
