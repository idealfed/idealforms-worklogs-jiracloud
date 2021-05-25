package com.idealfed.forms.model;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
public class IftVersion {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private Date date;
    private String author;
    private String versionId;

    @Type(type="org.hibernate.type.BinaryType")
    @Column(length=20971520)
    private byte[] config;

    @Column(length = 3500)
    private String description;
    @ManyToOne
    private IftFormSet iftFormSet;

    public IftVersion(){}

    public IftVersion(Date date, String author, byte[] config, String description, IftFormSet iftFormSet, String versionId)
    {
        this.date = date;
        this.author = author;
        this.config = config;
        this.description=description;
        this.iftFormSet=iftFormSet;
        this.versionId = versionId;
    }
    public IftVersion(IftFormSet iftFormSet) {
        this.iftFormSet=iftFormSet;
    }
    public IftFormSet getIftFormSet()
    {
        return this.iftFormSet;
    };
    public void setIftFormSet(IftFormSet iftFormSet)
    {
        this.iftFormSet = iftFormSet;
    };

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

    public String getAuthor()
    {
        return this.author;
    }
    public void setAuthor(String author){
        this.author=author;
    };

    public String getVersionId()
    {
        return this.versionId;
    }
    public void setVersionId(String versionId){
        this.versionId=versionId;
    };

    public byte[] getConfig()
    {
        return this.config;
    };
    public void setConfig(byte[] config){
        this.config=config;
    };

    public String getDescription()
    {
        return this.description;
    };
    public void setDescription(String description){
        this.description=description;
    };

}