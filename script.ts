import { PrismaClient } from "@prisma/client";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// async function main() {
//   await prisma.user.deleteMany({});
//   const users = await prisma.user.findMany();
//   console.log(users);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

app.get("/", async (req: express.Request, res: express.Response) => {
  const users = await prisma.user.findMany();
  console.log(users);
  res.render("signup", {
    users,
  });
});

app.post(
  "/",
  body("username").trim().escape().notEmpty().withMessage("invalid username"),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("invalid password"),
  body("confirmpw")
    .trim()
    .escape()
    .notEmpty()
    .isLength({ min: 1 })
    .custom((value, { req }) => value === req.body.password)
    .withMessage("password does not match"),
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const users = await prisma.user.findMany();
      return res.render("signup", { users, errors: errors.array() });
    }
    const { username, password } = req.body;
    console.log(username, password);
    console.log("signup successful");
    const result = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    console.log(result);
    const users = await prisma.user.findMany();
    return res.render("signup", {
      users,
    });
  }
);

// const port = 3001;
const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
