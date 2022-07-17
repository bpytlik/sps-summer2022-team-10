package com.google.sps.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import okhttp3.*;

/** Handles requests sent to the /token URL. */
@WebServlet("/token")
public class TokenServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    OkHttpClient client = new OkHttpClient();

    MediaType mediaType = MediaType.parse("application/x-www-form-urlencoded");
    RequestBody body = RequestBody.create(mediaType, "grant_type=client_credentials&scope=product.compact");
    Request newrequest = new Request.Builder()
        .url("https://api.kroger.com/v1/connect/oauth2/token")
        .post(body)
        .addHeader("Content-Type", "application/x-www-form-urlencoded")
        .addHeader("Authorization", "Basic aW5mbGF0aW9uZ3JvY2VyeWFwcC1kZWM4YTdmZjczZTlhZDRhYWI2ZmE3MGZhZGYyNzdlMTI5Njk1MTgwMzM3MDIzNTE2NjM6OEgyWXdZbjhJRFRLbEs0VFBXZEVEUnpWMjRLd1lZdi1sN0RFRzYxSA==")
        .build();

    response.setContentType("application/json;");
    Response newresponse = client.newCall(newrequest).execute();
    response.getWriter().println(newresponse.body().string());
  }
}