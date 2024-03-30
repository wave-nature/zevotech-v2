import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabase = createClient(
  "https://plpyfutennmvnfjedkpy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBscHlmdXRlbm5tdm5mamVka3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5NTAwMTQsImV4cCI6MjAyMjUyNjAxNH0.iHeInXtPuJ0n61dHjDB2zPJaGIoDHlet1I-V_jCn5fE"
);

const contactFormBtn = document.getElementById("send-message");

// 150980f598b8a3
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
