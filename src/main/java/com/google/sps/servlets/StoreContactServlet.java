package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.IncompleteKey;
import com.google.cloud.datastore.KeyFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

/** Servlet responsible for storing visitors' contact data entries. */
@WebServlet("/store-contact-info")
public class StoreContactServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Sanitize user input to remove HTML tags and JavaScript.
    String name = Jsoup.clean(request.getParameter("name-input"), Safelist.none());
    String email = Jsoup.clean(request.getParameter("email-input"), Safelist.none());
    String number = Jsoup.clean(request.getParameter("number-input"), Safelist.none());
    String subject = Jsoup.clean(request.getParameter("subject-input"), Safelist.none());
    String message = Jsoup.clean(request.getParameter("message-input"), Safelist.none());
    long timestamp = System.currentTimeMillis();

    // Create an instance of Datastore class
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    // Create a KeyFactory of kind ContactInfo
    KeyFactory keyFactory = datastore.newKeyFactory().setKind("ContactInfo");
    // Create an entity to be stored into the database
    FullEntity<IncompleteKey> contactEntity =
        Entity.newBuilder(keyFactory.newKey())
            .set("name", name)
            .set("email", email)
            .set("number", number)
            .set("subject", subject)
            .set("message", message)
            .set("timestamp", timestamp)
            .build();
    datastore.put(contactEntity);
    response.sendRedirect("contact.html");
  }
}