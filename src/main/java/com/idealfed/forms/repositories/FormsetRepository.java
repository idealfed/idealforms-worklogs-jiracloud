package com.idealfed.forms.repositories;

import org.springframework.data.repository.CrudRepository;
import com.idealfed.forms.model.FormSet;
import java.util.List;

public interface FormsetRepository extends CrudRepository<FormSet, Long> {

    FormSet findById(long id);

    List<FormSet> findAllByCustomerKeyOrderByIdDesc(String customerKey);
}