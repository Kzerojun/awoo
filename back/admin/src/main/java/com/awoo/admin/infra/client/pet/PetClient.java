package com.awoo.admin.infra.client.pet;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Set;

@FeignClient(name = "pet")
public interface PetClient {
    @PostMapping("/api/pets/admin")
    List<FetchPetInfo> fetchPetInfoList(@RequestBody Set<Integer> petIds);
}
