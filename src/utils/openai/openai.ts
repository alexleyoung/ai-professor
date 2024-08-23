export async function moderateText(text: string) {
  const res: { flagged: boolean } = await fetch("/api/moderate", {
    method: "POST",
    body: JSON.stringify({ message: text }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return res.flagged;
}
