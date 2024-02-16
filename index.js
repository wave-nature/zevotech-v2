import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabase = createClient(
  "https://plpyfutennmvnfjedkpy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBscHlmdXRlbm5tdm5mamVka3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5NTAwMTQsImV4cCI6MjAyMjUyNjAxNH0.iHeInXtPuJ0n61dHjDB2zPJaGIoDHlet1I-V_jCn5fE"
);

const contactFormBtn = document.getElementById("send-message");

// 150980f598b8a3

async function getClientIpAddress() {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    const ipAddress = response.data.ip;
    return ipAddress;
  } catch (error) {
    console.error("Error fetching IP address:", error.message);
    return null;
  }
}

async function getLocationFromIp(ip) {
  try {
    const response = await axios.get(
      `https://ipinfo.io/${ip}?token=150980f598b8a3`
    );
    const location = response.data;
    return location;
  } catch (error) {
    console.error("Error fetching location:", error.message);
    return null;
  }
}

async function saveSiteVisitImpression() {
  try {
    const ipAddress = await getClientIpAddress();
    if (!ipAddress) return console.log("No IP address found");

    const location = await getLocationFromIp(ipAddress);
    if (!location) return console.log("No location found");

    // check if user already visit website
    const { data } = await supabase
      .from("visits")
      .select("*")
      .eq("ip_address", ipAddress)
      .single();
    if (data) {
      // old visitor
      await supabase
        .from("visits")
        .update({ count: data.count + 1 })
        .eq("ip_address", ipAddress);
    } else {
      // new visitor
      await supabase.from("visits").insert([
        {
          ip_address: ipAddress,
          location,
          count: 1,
        },
      ]);
    }
  } catch (error) {
    console.log("Error in saving site visit impression", error.message);
  }
}

window.onload = async function getContacts() {
  await saveSiteVisitImpression();
};

async function contactFormHandler(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  await supabase.from("contacts").insert([
    {
      name,
      email,
      message,
    },
  ]);

  alert("We will get back to you soon!");
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

contactFormBtn.addEventListener("click", contactFormHandler);
