package com.supplychain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserActivityDTO {
    private Long id;
    private String activityType; // BATCH_CREATED, BATCH_UPDATED, PRODUCT_CREATED
    private String description;
    private Long batchId;
    private String batchNumber;
    private Long productId;
    private String productName;
    private LocalDateTime timestamp;
}
