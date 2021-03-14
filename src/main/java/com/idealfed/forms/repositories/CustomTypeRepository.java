package com.idealfed.forms.repositories;

import com.idealfed.forms.model.FormSet;
import com.idealfed.forms.model.CustomType;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CustomTypeRepository extends CrudRepository<CustomType, Long> {

    CustomType findById(long id);

    List<CustomType> findAllByCustomerKeyOrderByIdDesc(String customerKey);
}