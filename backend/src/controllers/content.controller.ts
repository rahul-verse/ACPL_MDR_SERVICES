import type { Request, Response } from "express";

import { faq, services } from "../data/content.js";

export function getServices(_req: Request, res: Response) {
  res.json({ data: services });
}

export function getFaq(_req: Request, res: Response) {
  res.json({ data: faq });
}
