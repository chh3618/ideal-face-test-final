// pages/api/generate.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const STABILITY_API_HOST = 'https://api.stability.ai';
const STABILITY_API_KEY = process.env.STABILITY_API_KEY; 

const ENGINE_ID = 'stable-diffusion-xl-1024-v1-0'; // 또는 'stable-diffusion-v1-6' 등 사용 중인 모델

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!STABILITY_API_KEY) {
    console.error("STABILITY_API_KEY is not set in .env.local");
    return res.status(500).json({ error: 'Server configuration error: STABILITY_API_KEY is missing' });
  }

  console.log(`[API/Generate] Generating image with prompt: "${prompt}" using Stability AI (${ENGINE_ID})`);

  try {
    const response = await axios.post(
      `${STABILITY_API_HOST}/v1/generation/${ENGINE_ID}/text-to-image`,
      {
        text_prompts: [{ text: prompt, weight: 1 }],
        cfg_scale: 7,
        clip_guidance_preset: 'FAST_BLUE',
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
        // 🚨 이 부분을 확인하거나 추가하세요! 🚨
        style_preset: 'photographic', // <-- 이 줄을 추가하거나 'photographic'으로 변경
        // negative_prompts: [{ text: "cartoon, anime, drawing, illustration, low quality, blurry, deformed, bad anatomy", weight: 1 }], // <-- 필요하다면 추가
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${STABILITY_API_KEY}`,
        },
      }
    );

    const { artifacts } = response.data;

    if (artifacts && artifacts.length > 0) {
      const base64Image = artifacts[0].base64;
      res.status(200).json({ imageUrl: `data:image/png;base64,${base64Image}` });
    } else {
      console.error('[API/Generate] Image generation succeeded but no artifact found:', response.data);
      res.status(500).json({ error: 'Image generation succeeded but no valid image found. It might have been filtered by AI.', detail: response.data });
    }

  } catch (error: any) {
    console.error('[API/Generate] Error calling Stability AI:', error.response?.data || error.message);

    let errorMessage = 'Failed to generate image due to an unknown error.';
    let errorDetail = null;

    if (axios.isAxiosError(error) && error.response) {
      errorDetail = error.response.data;
      errorMessage = error.response.data?.message || error.response.data?.errors?.join(', ') || error.message;
      if (error.response.status === 400) {
          errorMessage = 'Image generation failed: Invalid or restricted prompt. Please try a different description.';
      } else if (error.response.status === 401) {
          errorMessage = 'Authentication failed: Please check your Stability AI API key.';
      } else if (error.response.status === 429) {
          errorMessage = 'Rate limit exceeded: Too many requests. Please try again later.';
      }
    }

    res.status(500).json({ 
        error: errorMessage, 
        detail: errorDetail 
    });
  }
}