package com.nhc.CareerNest.service.impl;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.entity.ChatRoom;
import com.nhc.CareerNest.repository.ChatRoomRepository;
import com.nhc.CareerNest.repository.UserRepository;
import com.nhc.CareerNest.service.IChatRoomService;

@Service
public class ChatRoomService implements IChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    public ChatRoomService(
            ChatRoomRepository chatRoomRepository,
            UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
    }

    @Override
    public String getChatRoomName(
            Long senderId,
            Long recipientId,
            boolean createNewRoomIfNotExists) {

        ChatRoom currentChatRoomSR = this.chatRoomRepository.findBySenderIdAndReceiverId(senderId, recipientId);
        ChatRoom currentChatRoomRS = this.chatRoomRepository.findBySenderIdAndReceiverId(recipientId, senderId);

        if (currentChatRoomSR != null && currentChatRoomSR.getChatName() != null) {
            return currentChatRoomSR.getChatName();
        } else if (currentChatRoomRS != null && currentChatRoomRS.getChatName() != null) {
            return currentChatRoomRS.getChatName();
        } else {
            if (createNewRoomIfNotExists) {
                return createChatName(senderId, recipientId);
            }
            return null;
        }
    }

    @Override
    public String createChatName(Long senderId, Long recipientId) {

        var chatName = String.format("%s_%s", senderId, recipientId);

        ChatRoom senderRecipientRoom = new ChatRoom();
        senderRecipientRoom.setChatName(chatName);
        senderRecipientRoom.setSender(this.userRepository.findById(senderId).get());
        senderRecipientRoom.setReceiver(this.userRepository.findById(recipientId).get());

        ChatRoom recipientSenderRoom = new ChatRoom();
        recipientSenderRoom.setChatName(chatName);
        recipientSenderRoom.setSender(this.userRepository.findById(recipientId).get());
        recipientSenderRoom.setReceiver(this.userRepository.findById(senderId).get());

        chatRoomRepository.save(senderRecipientRoom);
        chatRoomRepository.save(recipientSenderRoom);

        return chatName;
    }

}
