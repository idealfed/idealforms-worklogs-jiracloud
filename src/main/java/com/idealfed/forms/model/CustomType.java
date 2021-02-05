package com.idealfed.forms.model;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class CustomType {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String name;
    private String description;
    private String fieldName;
    private String customType;
    @Lob
    @Column(length=20971520)
    private String settings;


    protected CustomType(){}
    public CustomType(String name, String deescription, String fieldName, String customType, String settings) {

        this.name=name;
        this.description=description;
        this.fieldName=fieldName;
        this.customType=customType;

        this.settings=settings;
    }
    public CustomType(String name){
        this.name=name;
    }

    public Long getId(){
        return this.id;
    }


    public String getName(){
        return this.name;
    };
    public void setName(String name){
        this.name=name;
    };

    public String getDescription(){
        return this.description;
    };
    public void setDescription(String description){
        this.description=description;
    };

    public String getFieldName(){
        return this.fieldName;
    };
    public void setFieldName(String fieldName){
        this.fieldName=fieldName;
    };

    public String getCustomType(){
        return this.customType;
    };
    public void setCustomType(String customType){
        this.customType=customType;
    };

    public String getSettings(){
        return this.settings;
    };
    public void setSettings(String settings){
        this.settings=settings;
    };
}