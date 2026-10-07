

https://github.com/user-attachments/assets/94444f64-b5bf-4767-886e-63cad2473ca6

# Prompt Motion

**[prompt-motion.github.io](https://prompt-motion.github.io)**

A gallery of AI motion prompts and Claude Opus motion design.

[Org site](https://prompt-motion.github.io) · [promptmotion.org](https://promptmotion.org) · [X](https://x.com/AiMotionSiteS)

Drop `videos/pixel-wizard.mp4` here.

The org site is the public gallery. Open a film, read the prompt or skill that made it, and follow the link back to the creator’s post. [promptmotion.org](https://promptmotion.org) is the same gallery on its own domain.

## What is in the gallery

Prompt Motion collects motion videos made with Claude Opus. Each card is one film:

- **Prompt** is the text for that one video: the scene, the timing, the type, and the camera.
- **Skill** is a reusable motion-design workflow, not a single script.
- The poster plays a short preview in view. The full prompt stays on the entry, next to the model, the stack, and the post date.
- Filter with Prompt or Skill. Sort by Popular or Recent.

There are 230 films on the live site. This repository includes the site source and six sample entries, not the whole catalog. Videos, posters, and prompt text belong to their creators.

## From the gallery

### Pixel wizard crypto animation

[@0xEvinho](https://x.com/0xEvinho/status/2103212966703436195) · [Open](https://promptmotion.org/0xevinho-3777d8)

Drop `videos/pixel-wizard.mp4` here.

https://github.com/user-attachments/assets/fe9519ee-1282-458e-ac1f-e7c04d471aad



https://github.com/user-attachments/assets/eb077839-aa5e-45a1-a44e-d6a57f46fd96



> make a similar version but with a crypto reference

### AIsa API key promo

[@0xfemyn](https://x.com/0xfemyn/status/2103796337041137833) · [Open](https://promptmotion.org/0xfemyn-e114d3)

Drop `videos/aisa-promo.mp4` here.

> make a dynamic 15-second motion graphics video for AIsa. Go all out.

### Claude self-intro motion graphic

[@1littlecoder](https://x.com/1littlecoder/status/2103587706999914649) · [Open](https://promptmotion.org/1littlecoder-9fef89)

Drop `videos/claude-self-intro.mp4` here.

> make a dynamic 10-second motion graphics video that shows who are you as Opus 5.5 - be as creative and dynamic as possible. Avoid the frames and texts on the corners which are typical ai made giveaways!

### Pixel art card battle game

[@aisongman](https://x.com/aisongman/status/2103763192971461057) · [Open](https://promptmotion.org/aisongman-71ffac)

Drop `videos/pixel-card-game.mp4` here.

> Create a 1-on-1 card game like Hearthstone. Just make it. As best you can. In pixel art style.

## Source

The gallery UI lives in this repo under [`source/`](source/).

| Piece | File |
| --- | --- |
| Home page, title, and intro | [`source/app/page.tsx`](source/app/page.tsx) |
| Gallery, filters, previews | [`source/components/gallery.tsx`](source/components/gallery.tsx) |
| Masonry layout | [`source/lib/masonry.ts`](source/lib/masonry.ts) |
| Entry page | [`source/app/[slug]/page.tsx`](source/app/[slug]/page.tsx) |
| Sample catalog, 6 films | [`source/data/catalog.json`](source/data/catalog.json) |

```bash
cd source
npm install
npm run dev
```

`npm run dev` serves the sample catalog. The org site and promptmotion.org serve the full gallery.

## Credits

Curated by [@AiMotionSiteS](https://x.com/AiMotionSiteS).

Videos and prompts belong to their creators. Each entry links to the original post.
