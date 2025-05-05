package com.nhc.CareerNest.controller;

//import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhc.CareerNest.service.impl.SubscriberService;
import com.nhc.CareerNest.util.anotation.ApiMessage;

@RestController
@RequestMapping("/api/v1")
public class EmailController {

    private final SubscriberService subscriberService;

    public EmailController(
            SubscriberService subscriberService) {
        this.subscriberService = subscriberService;
    }

    @GetMapping("/emails")
    @ApiMessage("Send simple email")
    // @Scheduled(cron = "0 0 0 1W * *")
    @Scheduled(cron = "0 */5 * * * *") // Mỗi 5 phút
    @Transactional
    public String sendSimpleEmail() {
        this.subscriberService.sendSubscribersEmailJobs();
        return new String();
    }

}
