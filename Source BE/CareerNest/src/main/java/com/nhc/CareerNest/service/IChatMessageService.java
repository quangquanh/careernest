package com.nhc.CareerNest.service;

import java.util.List;

import com.nhc.CareerNest.domain.entity.ChatMessage;

public interface IChatMessageService {

    ChatMessage save(ChatMessage chatMessage);

    List<ChatMessage> findChatMessages(
            Long senderId,
            Long recipientId);
}
