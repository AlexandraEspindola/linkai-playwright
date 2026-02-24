import { test, expect } from "@playwright/test";

test("deve logar com sucesso", async ({ page }) => {
  const user = {
    username: "ale",
    password: "189231",
  };

  await page.goto("http://localhost:3000/login");

  await page.fill("#username", user.username);
  await page.fill("#password", user.password);

  await page.waitForTimeout(3000);
  await page.locator('button[type="submit"]').click();

  const title = page.locator("h1"); //
  await expect(title).toContainText("Olá, Ale!");

  await page.waitForTimeout(3000);
});
