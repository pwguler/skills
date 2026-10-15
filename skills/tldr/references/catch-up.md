# Catch-up

The user asks what happened since their last message in this session. Assume that they remember that message and nothing after it. Their last message is the last thing that they typed before they asked. Notifications and subagent reports do not count.

The reply only reads. Do not edit code, start apps, or post anything to get the status. Make pictures only from what the session already has.

## Gather

- Everything since their last message that changed an outcome. That is your steps, subagent results, and messages from other people in the session.
- The live state of every PR, CI run, and background job that the session touched. Name the ones that still run, and the ones that you could not check.

An action item waits for the user and nobody else. Examples are a product choice, an approval, an action that cannot be undone, or access that you do not have. Keep off that list anything that you can still finish yourself. An action item raised before their last message counts while it still waits.

## Reply

Keep the text well under 150 words. Pictures do not count toward that limit. When the text grows past 150 words, shorten step 3 first. Never shorten step 4.

1. One sentence with the number of action items, or none. When nothing happened and nothing waits, say that and stop.
2. Put the pictures right after that sentence, before every other line of text. Embed each screenshot as an image, and each video inline, not only as a link. Then add a diagram when a change is easier to see than to read, built as [visual.md](visual.md) says.
3. What happened, most important first, as results and what they mean. Give one line for each thing that the user asked for: its result, and its state. The state is finished, failed, unchecked, or in progress. Never call a thing finished while it waits for the user. Give one line for each piece of work that you still own.
4. Give the action items as bullets, never as a diagram. For each action item, give the decision and why it matters now. Give the options with their cost, your recommendation, and the result when no answer comes. Give enough that the user can decide without opening a link. When a picture makes a choice clearer, put it after the action items. It shows the gain and the cost of each option.

## Pictures

- A picture is a screenshot, a video, a diagram, or a chart. A file tree in a code block counts as a diagram. A table is not a picture.
- Keep each diagram small: six boxes at most, and eight words at most in each box. Write box labels in plain words, not tags such as "Tests: pass".
- Never turn a status list into a diagram, and never draw boxes that nothing connects. Never show one fact twice, in the text or across pictures.
- Use a chart only for numbers that the session measured.
- When a visible change has no screenshot, write "no screenshot yet" on its line. Then say what changed on the screen.
- Never invent a number. Never draw or generate a screen that the session did not capture. Link only files that exist.

Name PRs, branches, and agents with the names that the user knows. Never use a label that you made up during the run.
