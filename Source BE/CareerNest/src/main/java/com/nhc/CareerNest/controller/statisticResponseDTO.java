package com.nhc.CareerNest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nhc.CareerNest.config.language.LocalizationUtils;
import com.nhc.CareerNest.constant.MessageKeys;
import com.nhc.CareerNest.domain.dto.response.base.RestResponse;
import com.nhc.CareerNest.service.impl.StatisticService;

@Controller
@RequestMapping("/api/v1")
public class statisticResponseDTO {

    private final StatisticService statisticService;
    private final LocalizationUtils localizationUtils;

    public statisticResponseDTO(
            StatisticService statisticService,
            LocalizationUtils localizationUtils) {
        this.statisticService = statisticService;
        this.localizationUtils = localizationUtils;
    }

    @GetMapping("/admin/statistic")
    public ResponseEntity<RestResponse> getStatistic() {
        RestResponse res = new RestResponse();

        res.setStatusCode(HttpStatus.OK.value());
        res.setData(this.statisticService.statistic());
        res.setMessage(localizationUtils.getLocalizedMessage(MessageKeys.CALL_API_SUCCESSFULLY));
        return ResponseEntity.ok(res);
    }

}
