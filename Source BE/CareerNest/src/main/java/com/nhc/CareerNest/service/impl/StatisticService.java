package com.nhc.CareerNest.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nhc.CareerNest.domain.dto.response.statistic.JobStatisticResponseDTO;
import com.nhc.CareerNest.domain.dto.response.statistic.StatisticResponseDTO;
import com.nhc.CareerNest.repository.CompanyRepository;
import com.nhc.CareerNest.repository.JobRepository;
import com.nhc.CareerNest.repository.ResumeRepository;
import com.nhc.CareerNest.repository.UserRepository;

@Service
public class StatisticService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final JobRepository jobRepository;
    private final ResumeRepository resumeRepository;

    public StatisticService(
            ResumeRepository resumeRepository,
            UserRepository userRepository,
            CompanyRepository companyRepository,
            JobRepository jobRepository) {
        this.resumeRepository = resumeRepository;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    public StatisticResponseDTO statistic() {

        StatisticResponseDTO statisticResponseDTO = new StatisticResponseDTO();

        statisticResponseDTO.setTotalApplications(resumeRepository.count());
        statisticResponseDTO.setTotalCompanies(companyRepository.count());
        statisticResponseDTO.setTotalCandidates(userRepository.countUsersWithRoleId3());
        statisticResponseDTO.setTotalJobs(jobRepository.count());
        statisticResponseDTO.setTotalUsers(userRepository.count());

        List<JobStatisticResponseDTO> jobStatistic = new ArrayList<>();

        for (int i = 0; i <= 12; i++) {
            JobStatisticResponseDTO jobStatisticResponseDTO = new JobStatisticResponseDTO();

            switch (i) {
                case 1:
                    LocalDate now = LocalDate.now();
                    int currentMonth = now.getMonthValue();
                    int currentYear = now.getYear();
                    jobStatisticResponseDTO.setMonth(currentMonth);
                    jobStatisticResponseDTO.setTotalJobs(jobRepository.countByMonthAndYear(currentMonth, currentYear));

                    jobStatistic.add(jobStatisticResponseDTO);
                    break;

                case 2:
                    LocalDate oneMonthsAgo = LocalDate.now().minusMonths(1);
                    int oneMonthAgo = oneMonthsAgo.getMonthValue();
                    int oneMonthAgoYear = oneMonthsAgo.getYear();
                    jobStatisticResponseDTO.setMonth(oneMonthAgo);
                    jobStatisticResponseDTO
                            .setTotalJobs(jobRepository.countByMonthAndYear(oneMonthAgo, oneMonthAgoYear));

                    jobStatistic.add(jobStatisticResponseDTO);

                    break;
                case 3:
                    LocalDate twoMonthsAgo = LocalDate.now().minusMonths(2);
                    int twoMonthAgo = twoMonthsAgo.getMonthValue();
                    int twoMonthAgoYear = twoMonthsAgo.getYear();
                    jobStatisticResponseDTO.setMonth(twoMonthAgo);
                    jobStatisticResponseDTO
                            .setTotalJobs(jobRepository.countByMonthAndYear(twoMonthAgo, twoMonthAgoYear));

                    jobStatistic.add(jobStatisticResponseDTO);

                    break;
                case 4:
                    LocalDate threeMonthsAgo = LocalDate.now().minusMonths(3);
                    int threeMonthAgo = threeMonthsAgo.getMonthValue();
                    int threeMonthAgoYear = threeMonthsAgo.getYear();
                    jobStatisticResponseDTO.setMonth(threeMonthAgo);
                    jobStatisticResponseDTO
                            .setTotalJobs(jobRepository.countByMonthAndYear(threeMonthAgo, threeMonthAgoYear));

                    jobStatistic.add(jobStatisticResponseDTO);
                    break;
                case 5:
                    LocalDate fourMonthsAgo = LocalDate.now().minusMonths(4);
                    int fourMonthAgo = fourMonthsAgo.getMonthValue();
                    int fourMonthAgoYear = fourMonthsAgo.getYear();
                    jobStatisticResponseDTO.setMonth(fourMonthAgo);
                    jobStatisticResponseDTO
                            .setTotalJobs(jobRepository.countByMonthAndYear(fourMonthAgo, fourMonthAgoYear));

                    jobStatistic.add(jobStatisticResponseDTO);
                    break;
                case 6:
                    LocalDate fiveMonthsAgo = LocalDate.now().minusMonths(5);
                    int fiveMonthAgo = fiveMonthsAgo.getMonthValue();
                    int fiveMonthAgoYear = fiveMonthsAgo.getYear();
                    jobStatisticResponseDTO.setMonth(fiveMonthAgo);
                    jobStatisticResponseDTO
                            .setTotalJobs(jobRepository.countByMonthAndYear(fiveMonthAgo, fiveMonthAgoYear));

                    jobStatistic.add(jobStatisticResponseDTO);
                    break;
                case 7:
                    LocalDate sixMonthsAgo = LocalDate.now().minusMonths(6);
                    int sixMonthAgo = sixMonthsAgo.getMonthValue();
                    int sixMonthAgoYear = sixMonthsAgo.getYear();
                    jobStatisticResponseDTO.setMonth(sixMonthAgo);
                    jobStatisticResponseDTO
                            .setTotalJobs(jobRepository.countByMonthAndYear(sixMonthAgo, sixMonthAgoYear));

                    jobStatistic.add(jobStatisticResponseDTO);

                    break;
                case 8:
                    LocalDate sevenMonthsAgo = LocalDate.now().minusMonths(7);
                    int sevenMonthAgo = sevenMonthsAgo.getMonthValue();
                    int sevenMonthAgoYear = sevenMonthsAgo.getYear();
                    jobStatisticResponseDTO.setMonth(sevenMonthAgo);
                    jobStatisticResponseDTO
                            .setTotalJobs(jobRepository.countByMonthAndYear(sevenMonthAgo, sevenMonthAgoYear));

                    jobStatistic.add(jobStatisticResponseDTO);

                    break;
                case 9:
                    LocalDate eightMonthsAgo = LocalDate.now().minusMonths(8);
                    int eightMonthAgo = eightMonthsAgo.getMonthValue();
                    int eightMonthAgoYear = eightMonthsAgo.getYear();
                    jobStatisticResponseDTO.setMonth(eightMonthAgo);
                    jobStatisticResponseDTO
                            .setTotalJobs(jobRepository.countByMonthAndYear(eightMonthAgo, eightMonthAgoYear));

                    jobStatistic.add(jobStatisticResponseDTO);

                    break;
                case 10:
                    LocalDate nineMonthsAgo = LocalDate.now().minusMonths(9);
                    int nineMonthAgo = nineMonthsAgo.getMonthValue();
                    int nineMonthAgoYear = nineMonthsAgo.getYear();
                    jobStatisticResponseDTO.setMonth(nineMonthAgo);
                    jobStatisticResponseDTO
                            .setTotalJobs(jobRepository.countByMonthAndYear(nineMonthAgo, nineMonthAgoYear));

                    jobStatistic.add(jobStatisticResponseDTO);

                    break;
                case 11:
                    LocalDate tenMonthsAgo = LocalDate.now().minusMonths(10);
                    int tenMonthAgo = tenMonthsAgo.getMonthValue();
                    int tenMonthAgoYear = tenMonthsAgo.getYear();
                    jobStatisticResponseDTO.setMonth(tenMonthAgo);
                    jobStatisticResponseDTO
                            .setTotalJobs(jobRepository.countByMonthAndYear(tenMonthAgo, tenMonthAgoYear));

                    jobStatistic.add(jobStatisticResponseDTO);

                    break;
                case 12:
                    LocalDate elevenMonthsAgo = LocalDate.now().minusMonths(11);
                    int elevenMonthAgo = elevenMonthsAgo.getMonthValue();
                    int elevenMonthAgoYear = elevenMonthsAgo.getYear();
                    jobStatisticResponseDTO.setMonth(elevenMonthAgo);
                    jobStatisticResponseDTO
                            .setTotalJobs(jobRepository.countByMonthAndYear(elevenMonthAgo, elevenMonthAgoYear));

                    jobStatistic.add(jobStatisticResponseDTO);

                    break;
            }
        }
        statisticResponseDTO.setJobStatistic(jobStatistic);
        return statisticResponseDTO;
    }
}
