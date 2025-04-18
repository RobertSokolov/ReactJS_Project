import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Cache Entries for favorites
const cache = new Map<string, any>();

router.post("/work", async (req, res): Promise<any> => {
  const { workId } = req.body;
  console.log(workId);

  if (typeof workId !== "string" || workId.trim() === "") {
    return res.status(400).json({ message: "workId must be a non-empty string" });
  }

  try {
    if (cache.has(workId)) {
      console.log(`Cache hit: ${workId}`);
      return res.json({ work: cache.get(workId) });
    }

    console.log(`Fetching: ${workId}`);
    const response = await fetch(`https://openlibrary.org/works/${workId}.json`);
    if (!response.ok) throw new Error(`Failed to fetch ${workId}`);

    const data = await response.json();
    cache.set(workId, data);

    res.json({ work: data });
  } catch (error) {
    console.error("OpenLibrary fetch error:", error);
    res.status(500).json({ message: "Failed to fetch work data" });
  }
});
router.get('/subject/:name',async (req: Request ,res: Response ): Promise<any> => {

    const { name } = req.params;
  const { limit = 50, offset = 0 } = req.query;
  const url = `http://openlibrary.org/subjects/${name}.json?limit=${limit}&offset=${offset}`;
  try{
    const response = await fetch(url);
    if(!response.ok){
        return res.status(response.status).json({error: 'Failed To Fetch from Open Library'});

    }
    const data = await response.json();
    res.json(data);
  }catch(err) {
    res.status(500).json({error: "DDInternal server error", err});
  }
})


export default router