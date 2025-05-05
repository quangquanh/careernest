// package com.nhc.CareerNest.config.data;

// import org.springframework.context.annotation.Bean;
// import org.springframework.kafka.core.*;
// import org.springframework.kafka.listener.CommonErrorHandler;
// import org.springframework.kafka.listener.DeadLetterPublishingRecoverer;
// import org.springframework.kafka.listener.DefaultErrorHandler;
// import org.springframework.util.backoff.FixedBackOff;
// import org.springframework.context.annotation.Configuration;
// import org.apache.kafka.clients.admin.NewTopic;

// @Configuration
// // @EnableKafka(autostartup=false)
// public class KafkaConfiguration {
//     @Bean
//     public CommonErrorHandler errorHandler(KafkaOperations<Object, Object> template) {
//         return new DefaultErrorHandler(
//                 new DeadLetterPublishingRecoverer(template), new FixedBackOff(1000L, 2));
//     }

//     @Bean
//     public NewTopic insertAJobTopic() {
//         return new NewTopic("create-a-job", 1, (short) 1);
//     }

//     @Bean
//     public NewTopic getAllCateJobsTopic() {
//         return new NewTopic("get-all-job", 1, (short) 1);
//     }
// }