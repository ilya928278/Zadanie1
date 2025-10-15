import { createClient } from '@supabase/supabase-js';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = 'https://bawqpetcicwqaejnvuro.supabase.co';
const supabaseKey = 'sb_publishable_WZH697QGccpGbRrACmm5Ew_QoNQNAx1';
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("frontend"));

//-------------------------------------------------

app.get("/status", (req, res) => {
  res.json({ status: "Running" });
});

//---------------------------------------

app.get("/UserData", async (req, res) => {
  try {
    const { data, error } = await supabase.from('UserData').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/UserData", async (req, res) => {
  const { name, level } = req.body;

  if (!name || !level) {
    return res.status(400).json({ error: "Name and level are required" });
  }

  try {
    const { data, error } = await supabase
      .from('UserData')
      .insert([{ name, level, account_creation_date: new Date().toISOString() }])
      .select(); // returns inserted row

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//-------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server Listening on PORT: ${PORT}`);
});
