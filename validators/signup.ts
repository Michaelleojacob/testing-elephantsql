// const validateSignup = [
//   check("username").trim().escape().notEmpty(),
//   check("password").trim().escape().notEmpty().isLength({ min: 1 }),
//   check("confirmpw")
//     .trim()
//     .escape()
//     .notEmpty()
//     .isLength({ min: 1 })
//     .custom((value, { req }) => value === req.body.password)
//     .withMessage("The passwords do not match"),
//   (req: any, res: any, next: any) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.render('signup', {});
//     next();
//   },
// ];

// export { validateSignup };
