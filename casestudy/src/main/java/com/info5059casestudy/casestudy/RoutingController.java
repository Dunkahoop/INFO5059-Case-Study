package com.info5059casestudy.casestudy;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RoutingController {
    @RequestMapping({ "/home", "/vendors", "/products", "/generator", "/viewer" })
    public String index() {
        return "forward:/index.html";
    }
}
