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
public class SupplyChainEventDTO {
    private Long id;
    private Long batchId;
    private Long productId;
    private String productName;
    private Long fromParty;
    private String fromPartyEmail;
    private Long toParty;
    private String toPartyEmail;
    private String location;
    private String status;
    private LocalDateTime timestamp;
    private String txHash;
    private Long blockNumber;
    private Boolean verified;
}
