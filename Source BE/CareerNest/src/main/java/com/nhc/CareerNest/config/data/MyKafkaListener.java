// package com.nhc.CareerNest.config.data;

// import org.springframework.kafka.annotation.KafkaHandler;
// import org.springframework.kafka.annotation.KafkaListener;
// import org.springframework.stereotype.Component;

// import com.nhc.CareerNest.domain.entity.Job;

// import java.util.List;

// @Component
// @KafkaListener(id = "groupB", topics = { "get-all-job", "create-a-job" })
// public class MyKafkaListener {

//     @KafkaHandler
//     public void listenJob(Job job) {
//         System.out.println("Received: " + job);
//     }

//     @KafkaHandler(isDefault = true)
//     public void unknown(Object object) {
//         System.out.println("Received unknown: " + object);
//     }

//     @KafkaHandler
//     public void listenListOfJob(List<Job> job) {
//         System.out.println("Received: " + job);
//     }

//     @KafkaHandler
//     public void listenRaw(String message) {
//         System.out.println("Received raw message: " + message);
//     }

// }
