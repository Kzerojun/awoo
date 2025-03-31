package com.awoo.pet.application;

import com.awoo.pet.domain.walk.Walk;

import java.util.List;

public interface SearchWalkInMonthService {

    List<Walk> searchWalkInMonth(Integer petId);
}
