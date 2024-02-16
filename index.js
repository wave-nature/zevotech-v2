import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://plpyfutennmvnfjedkpy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBscHlmdXRlbm5tdm5mamVka3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5NTAwMTQsImV4cCI6MjAyMjUyNjAxNH0.iHeInXtPuJ0n61dHjDB2zPJaGIoDHlet1I-V_jCn5fE"
);

const contactFormBtn = document.getElementById("send-message");

document.onload = async function getContacts() {
  const { data } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", "1e7521e6-8cc7-444c-b730-def375728bfc")
    .single();
  const count = data.count + 1;
  await supabase
    .from("visits")
    .update({ count })
    .eq("id", "1e7521e6-8cc7-444c-b730-def375728bfc");
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
