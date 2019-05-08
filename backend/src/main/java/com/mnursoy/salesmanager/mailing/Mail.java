package com.mnursoy.salesmanager.mailing;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class Mail {

    private String from;
    private String to;
    private String subject;
    private Map<String, Object> model = new HashMap<>();

}