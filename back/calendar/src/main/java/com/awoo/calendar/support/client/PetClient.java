package com.awoo.calendar.support.client;

import com.awoo.calendar.support.ApiUtils;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "pet" )
public interface PetClient {

    @GetMapping("/api/pets/{petId}")
    ApiUtils.ApiResult<?> getPetInfo(@PathVariable Integer petId);


    @GetMapping("/api/pets")
    ApiUtils.ApiResult<?> getPetList(@RequestHeader("X-User-Id") Integer memberId);

}
