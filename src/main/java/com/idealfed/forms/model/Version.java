package com.idealfed.forms.model;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
public class Version {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private Date date;
    private String author;
    @Lob
    @Column(length=20971520)
    private String config;
    private String customerKey;

    public Version(){}

    public Version(Date date, String author, String config, String customerKey)
    {
        this.date = date;
        this.author = author;
        this.config = config;
        this.customerKey=customerKey;
    }

    public Long getId(){
        return this.id;
    }

    public Date getDate()
    {
        return this.date;
    };
    public void setDate(Date date)
    {
        this.date=date;
    }

    public String  getAuthor()
    {
        return this.author;
    }
    public void setAuthor(String author){
        this.author=author;
    };

    public String getConfig()
    {
        return this.config;
    };
    public void setConfig(String config){
        this.config=config;
    };

    public String getCustomerKey()
    {
        return this.customerKey;
    };
    public void setCustomerKey(String customerKey){
        this.customerKey=customerKey;
    };

}