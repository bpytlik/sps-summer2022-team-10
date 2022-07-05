package com.google.sps.servlets;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
// import com.google.appengine.labs.repackaged.org.json.JSONObject;

/** Handles Kroger API, send requests to API and get the data  */
/** Take user input and use the input to return data from Kroger API  */
@WebServlet("/data-kroger")
public class DataServlet extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
  
      // Get the value entered in the form.
      String textValue = request.getParameter("text-input");
      response.setContentType("text/html;");
      
    
      switch(textValue) {
        case "egg" :
            response.getWriter().println("{eggs:[{'item':'egg', 'price':4.50, 'store':'california'}, {'item':'egg', 'price':5.50, 'store':'oregon'}, {'item':'egg', 'price':3.50, 'store':'washington'}]}");
            break;
        case "milk" :
            response.getWriter().println("{milk:[{'item':'milk', 'price':5.30, 'store':'california'}, {'item':'milk', 'price':6.50, 'store':'oregon'}, {'item':'milk', 'price':4.50, 'store':'washington'}]}");
            break;
        case "apple" :
            response.getWriter().println("{apples:[{'item':'apple', 'price':1.30, 'store':'california'}, {'item':'apple', 'price':1.50, 'store':'oregon'}, {'item':'apple', 'price':1.30, 'store':'washington'}]}");
            break;
        default :
            response.getWriter().println("error");
      }

    }
    
}

    //   String eggs = "{eggs:[{'item':'egg', 'price':4.50, 'store':'california'}, {'item':'egg', 'price':5.50, 'store':'oregon'}, {'item':'egg', 'price':3.50, 'store':'washington'}]}";
    //   "{data: [{\"\name\"\:\"\John\"\, \"\age\"\:30, \"car\":null}, {\"\name\"\:\"\Peter\"\, \"\age\"\:30, \"\car\"\:null}, {\"\name\"\:\"\Tom\"\, \"\age\":30, \"\car\"\:null}]"
    //   JsonObject jsonObject = (JsonObject) jsonParser.parse(jsonString);  