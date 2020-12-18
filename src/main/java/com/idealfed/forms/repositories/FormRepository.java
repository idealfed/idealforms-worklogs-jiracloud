package com.idealfed.forms.repositories;

import com.idealfed.forms.model.Form;
import com.idealfed.forms.model.FormSet;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FormRepository extends CrudRepository<Form, Long> {

    Form findById(long id);
    List<Form> findByFormSet(FormSet fs);

}