package com.nhc.CareerNest.service;

public interface IChatRoomService {

    String getChatRoomName(
            Long senderId,
            Long recipientId,
            boolean createNewRoomIfNotExists);

    String createChatName(Long senderId, Long recipientId);
}
