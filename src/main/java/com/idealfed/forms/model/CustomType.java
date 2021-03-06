package com.idealfed.forms.model;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;

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

    @Type(type="org.hibernate.type.BinaryType")
    @Column(length=20971520)
    private byte[] settings;
    private String customerKey;

    protected CustomType(){}
    public CustomType(String name, String deescription, String fieldName, String customType, byte[] settings, String customerKey) {

        this.name=name;
        this.description=description;
        this.fieldName=fieldName;
        this.customType=customType;
        this.customerKey=customerKey;
        this.settings=settings;
    }
    public CustomType(String name){
        this.name=name;
    }

    public Long getId(){
        return this.id;
    }

    public String getCustomerKey()
    {
        return this.customerKey;
    };
    public void setCustomerKey(String customerKey){
        this.customerKey=customerKey;
    };

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

    public byte[] getSettings(){
        return this.settings;
    };
    public void setSettings(byte[] settings){
        this.settings=settings;
    };
}