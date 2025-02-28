import { Request, Response } from "express";
import { Contact, IContact } from "./contacts.model.js";

export const contactController = {
  searchContacts: async (req: Request, res: Response): Promise<void> => {
    try {
      const search: string | undefined = req.query.q as string | undefined;

      let result: IContact[];

      if (!search || search === "") {
        result = await Contact.find({});
      } else {
        result = await Contact.find({
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
          ],
        });
      }

      res.json(result);
    } catch (error) {
      console.error("Error searching contacts:", error);
      res.status(500).json({ message: "Error searching contacts" });
    }
  },
};
