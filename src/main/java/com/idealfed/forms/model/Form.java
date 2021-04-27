package com.idealfed.forms.model;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class Form {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column(length = 255)
    private String name;

    @Column(length = 255)
    private String testIssue;
    @Column(length = 100)
    private String issueType;
    @Column(length = 255)
    private String formAnon;
    @Column(length = 255)
    private String formProxy;
    @Column(length = 255)
    private String formType;

    @Column(length=20971520)
    private byte[] fields;

    @Column(length=20971520)
    private byte[] settings;
    @ManyToOne
    private FormSet formSet;

    protected Form(){}
    public Form(String name, String testIssue, String issueType, String formAnon, String formProxy, String formType, byte[] fields,FormSet formSet) {
        this.name=name;
        this.testIssue=testIssue;
        this.formAnon=formAnon;
        this.formProxy=formProxy;
        this.formType=formType;
        this.fields=fields;
        this.settings=settings;
        this.formSet=formSet;
    }
    public Form(String name, FormSet formSet) {
        this.name=name;
        this.formSet=formSet;
    }
    public FormSet getFormSet()
    {
        return this.formSet;
    };
    public void setFormSet(FormSet formSet)
    {
        this.formSet = formSet;
    };

    public Long getId(){
        return this.id;
    }

    public String getName(){
        return this.name;
    };
    public void setName(String name){
        this.name=name;
    };

    public String getTestIssue(){
        return this.testIssue;
    };
    public void setTestIssue(String testIssue){
        this.testIssue=testIssue;
    };

    public String getFormAnon(){
        return this.formAnon;
    };
    public void setFormAnon(String formAnon){
        this.formAnon=formAnon;
    };

    public String getIssueType(){
        return this.issueType;
    };
    public void setIssueType(String issueType){
        this.issueType=issueType;
    };

    public String getFormProxy(){
        return this.formProxy;
    };
    public void setFormProxy(String formProxy){
        this.formProxy=formProxy;
    };

    public String getFormType(){
        return this.formType;
    };
    public void setFormType(String formType){
        this.formType=formType;
    };

    public byte[] getFields(){
        return this.fields;
    };
    public void setFields(byte[] fields){
        this.fields=fields;
    };

    public byte[] getSettings(){
        return this.settings;
    };
    public void setSettings(byte[] settings){
        this.settings=settings;
    };
}