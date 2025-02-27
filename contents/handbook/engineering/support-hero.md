---
title: Support hero
sidebar: Handbook
showTitle: true
---

We have two types of rotations for engineering:

1. **Support Hero** - first line responder to customer questions and bug reports
2. **Secondary on-call** - responsible for prioritizing and solving escalated issues, Sentry errors and alerts

When someone is _Support Hero_, they are also the secondary on-call person for their team

## 1. Support Hero

Every week, we assign one person to be the "Support Hero." If this is you this week, congratulations! Support hero is an intense but super fun week where you get to talk to a bunch of users, get the satisfaction of helping them out, and contribute to a lot of different parts of our system.

### Expectations

All other work takes a back seat while you're doing support, so don't plan on doing any 'normal' work. Furthermore expect that you will need a day or two the week after to follow-up on the less urgent issues. Please don't hand off too many things to the next support hero and make the start of their week more stressful.

You should work your 'normal' hours during this week. There will likely be more issues than you'll have time to fix so be sure to prioritise. If there's an important and urgent issue near the end of your day, hand it off to someone on the other side of the Atlantic.

If you are planning on taking a day off or you won't be available, please find someone to swap with and update the rotation on PagerDuty. Be sure to schedule an override for both swaps and **do not alter the rotation order** to avoid affecting other members.

### Rotation

You can view the Support Hero rotation [in PagerDuty here](https://posthog.pagerduty.com/schedules#PPLGE4G).

### Channels

There are a couple of channels that customer requests come in so make sure you keep an eye on all of them, but **most support tickets will come into [Zendesk](#Zendesk)**. Beyond Zendesk, you should keep an eye on:

- [Unthread](https://posthog.slack.com/archives/D04725CS7JR) is used by the CS team to track issues with our high priority customers in dedicated Slack Connect channels.
- [PostHog Users's Slack](https://posthog.com/slack), specifically `#community-support`. Users who post in `#general` or elsewhere should be instructed to post in `#community-support`
- Sentry issues, either [directly](https://sentry.io/organizations/posthog/issues/?project=1899813) or in `#sentry` in our main Slack.

### Communication

As an engineer, when a question comes in your first instinct is to give them an answer as quickly as possible. That means we often forget pleasantries, or will ignore a question until we've found the answer. Hence the following guidelines:

- Always respond to a question within a reasonable timeframe during your working day (<15 minutes is great, <1 hour is okay, anything over a day is too late)
  - If you're ready to look into the issue and you think it might take a while/require a fix, just mention that and say you'll get back to them
  - If you have no idea how to answer or fix their issue, @mention someone who does
- Start your response with `Hey [insert name], ...` and make sure you're polite, not everyone you talk to is an engineer and as accepting of terse messages
  - If it's an email, make sure you format your message as an email and only send a single message, not multiple
- Follow up!
- Housekeeping. Once a customer issue/question has been addressed, close the ticket on [Zendesk](#zendesk) or [Unthread](#unthread) to make it easy to identify outstanding conversations.

To help manage users' expectations, you might find it useful to share a message in #community-support when you are signing on and off for the day.

### Prioritizing requests

As a business we need to ensure we are focusing support on our paying customers, as such this is the prioritization order you should apply as Support Hero.  At the end of your rotation you need to ensure that any items in 1-4 are resolved or passed to the next Support Hero _as a minimum_.

1. Any requests where you are tagged by the Customer Success team in a dedicated slack channel as there will be some urgency needed.
2. Any requests assigned to you in [Unthread](https://posthog.slack.com/archives/D04725CS7JR) as they will be from a high priority customer in a dedicated Slack channel.
3. Open Zendesk tickets in the [High Priority Queue](https://posthoghelp.zendesk.com/agent/filters/7114751198491) (high-paying customers).
4. Open Zendesk tickets in the [Normal Priority Queue](https://posthoghelp.zendesk.com/agent/filters/7114873854747) (paying customers).
5. [Squeak!](https://posthog.com/questions/) questions.
6. [#community-support](https://posthogusers.slack.com/archives/C01GLBKHKQT) channel on the User Slack.
7. Open Zendesk tickets in the [Low Priority Queue](https://posthoghelp.zendesk.com/agent/filters/7115368073755) (non-paying users).

### Triaging issues to the relevant small team

As the support hero you should triage any bugs/feature requests that you don't deal with to the relevant small team. They are ultimately responsible for handling bugs and feature requests for their area of the product.

### Support for self-hosted users

Supporting self-hosted users can be particularly tricky/time-consuming!

If the messages are from a dedicated slack, a tag from the CS team or 'high' priority zendesk then these are high-priority and **do prioritize** them accordingly. You'll likely find [these docs useful](https://posthog.com/docs/self-host/deploy/troubleshooting).

However, if it's in the community slack then these are low priority. If you don't have the time to solve it then it's fine to politely point them to the docs for [self-serve open-source support](/docs/self-host/open-source/support#support-for-open-source-deployments-of-posthog) and ask them to file a github issue if they believe something is broken in the docs or deployment setup.

## Categorizing requests

It's really valuable for us to understand what types of requests we've had so we can prioritize our investments in certain areas and work out if we're making things better for our users (e.g. we use this as a measure of how easy it is to deploy PostHog).

When you initially respond to an issue in Zendesk add a "tag" with the following categories:
* User experience _(confusing/unclear UX)_.
* Docs confusion _either missing or confusing_.
* App Performance
* Ingestion _(either problems and not working or performance)_.
* Insights
* Data integrity
* Deployments/Setup
* Deployments/Upgrading
* Deployments/Maintenance
* Non-self-serve _for requests that need to be processed manually (e.g. removing events)_.
* Billing
* Feature request
* Bug _functionality bugs, something is broken_.

If something falls into two categories, but predominantly one, just tag the one you think is most relevant. If the ticket covers multiple topics, tag with all the relevant tags.

If a ticket doesn't fit a category correctly, we might need to update our tags -- open a PR to edit this page.

### Escalating issues

You should always try to figure out the issues customers are having by yourself before escalating. This means gathering more information from the customer, reproducing the issue and ideally fixing the issue yourself by creating a PR. Only if you are completely swamped, you really don't have any knowledge about the area (most common with deployment questions) or you can't figure out what's going on should you escalate to secondary on call.

### How to help customers

- The reason it's so great to have engineers do support is that you can actually help customers solve their issues, rather than just escalating it. Hence you should aim to **go deep** and **actually solve people's issues**, whether that involves going deep on our functionality or spending half a day writing a PR to fix someone's issue
- On app.posthog.com, you can log in as a user to help debug their issues.
    - Do this by going to https://app.posthog.com/admin/posthog/user/, finding the relevant user and clicking 'log in as them'
    - To go back to your old user, just log out
    - If they have asked for help it is safe to assume they've given permission for you to log in as them.
    - You can also check to see sentry errors tied to the user via the `user.username` parameter for e.g. [for test@posthog.com](https://sentry.io/organizations/posthog2/issues/?project=1899813&query=is%3Aunresolved+user.username%3Atest%40posthog.com&statsPeriod=14d)
- When trying to debug an issue with a customer and it's not immediately obvious, it's usually much faster to do a Zoom session. You also tend to get other useful product feedback.
- When dealing with slowness, ask users to send a screenshot of their "System Status" page (under settings)
  - If they have a lot of volume and they're still on Postgres they should probably upgrade to Clickhouse
- Sometimes questions will have been asked earlier in the User's Slack so it's worth searching through that if you're not sure.

#### Debugging deployments

See the handbook page [Deployments Support](/handbook/engineering/deployments-support) and user-facing [Deployments Troubleshooting](/docs/self-host/deploy/troubleshooting) page.

#### Ingestion issues

If a user is sending events to PostHog and these are not getting ingested, despite them receiving a success response, try the following:

1. Check if the app/plugin server is alive and healthy (suggest a restart if not - this is safe)
2. Ask if they have Sentry set up and see any errors
3. If Sentry is not available, tell them to [connect to ClickHouse](/docs/self-host/deploy/troubleshooting#how-do-i-connect-to-clickhouse) and query for the columns `error_location` and `error` on the table `events_dead_letter_queue`

#### Reviewing new apps

From time to time, customers will request to get their apps added to PostHog Cloud, based on [this tutorial](https://posthog.com/docs/apps/build/tutorial#submitting-your-app). When this happens, do the following:

1. Review the app: check it doesn't do anything dangerous, like making an arbitrary number of requests, or attempt to DDOS some server.
2. Ensure it has a `logo.png` file
3. Fork their GitHub project
4. Add the forked project to our [Integrations Repository](https://github.com/PostHog/integrations-repository)
5. Tell the marketing team about this new integration
6. Install it on Cloud, and make it global

#### Updating existing apps

1. Open a PR against our forked version of the plugin with the new changes (syncing from the main repo).
2. Review the code changes and merge the PR. Look out for:
  - Proper error handling (plugin emits [RetryError](https://posthog.com/docs/apps/build/reference#maximizing-reliability-with-retryerror) when relevant, instead of throwing unhandled exceptions)
  - Proper use of resources (bounded memory and CPU usage, external requests kept to a minimum)
  - Good security practices (the plugin cannot be used to DDoS some server) 
  - Unit testing coverage when possible
3. Update the app in our Cloud instances via the `Browse Apps` page, both on [prod-eu](https://eu.posthog.com/project/apps?tab=installed) and [prod-us](https://app.posthog.com/project/apps?tab=installed). You need instance staff permissions to do this.

### Zendesk

We use [Zendesk Support](https://zendesk.com/) as our internal platform to manage support tickets. This ensures that we don't miss anyone, especially when their request is passed from one person to another at PostHog, or if they message us over the weekend.

Zendesk allows us to manage all our customer conversations in one place and reply through Slack or email. We also use [Help](https://www.atlassian.com/software/halp) if you want to easily create and manage Zendesk tickets directly from inside the PostHog Users Slack. 

This ensures that we don't miss anyone, especially when their request is passed from one person to another at PostHog, or if they message us over the weekend. You should have received an invite to join both Zendesk and Help as part of onboarding - if you didn't, ask Grace.

Zendesk will get populated with new issues from people outside the PostHog organization on the `posthog` and `posthog.com` repos, and also Squeak questions. These tickets will come with links to the issue or Squeak so you can answer them in the appropriate platform, rather than on Zendesk itself.

The feedback box on the PostHog app will automatically create a Zendesk ticket and let the user know that we've create a ticket for them. If it's a feature request feel free to reply with something short like "Thanks for the feedback! We'll take a look at this and get back to you if we have any questions." and pass it on to the team. If there's not enough information it might be worth reviewing the session recording or asking them for more information.

#### How to access Zendesk

You can access the app via [posthoghelp.zendesk.com](https://posthoghelp.zendesk.com).

The first time you sign into Zendesk, please make sure you include your name and [profile picture](https://posthog.com/handbook/company/team) so our users know who they are chatting to!

#### How to use Zendesk

You’ll spend most of your time in the Views pane, where you’ll find all tickets divided into different lists depending on who they are assigned to, and whether they have been solved or not.

Tips:

* If need more information from the customer to solve the issue, respond and mark as pending. 
* If you think you solved the issue mark as solved (if they reply it will re-open and it's easier for everyone if there's less open tickets around).
* Provide actionable information as _Note_ (e.g. links to internal slack threads, partial investigation, ...)

##### How to deal with spam, marketing, partnership proposals, candidates etc.

Emails sent to [hey@posthog.com](mailto:hey@posthog.com) automatically create tickets in Zendesk, which are prioritized and delegated by the Support Hero.

Like every other email address in this world, hey@ gets quite a bit of spam (and we reroute this to Zendesk). When this happens, simply mark the conversation as closed.

For marketing, partnership proposals or anything like that, please post in Slack in #team-marketing before taking an action.

For candidates trying to apply to PostHog, e.g. sending their CV you can simply ignore & close - Charles is in hey@ and will forward them directly on to careers@ to be dealt with.

### Unthread

Our Customer Success team uses Unthread to track the resolution of threads in Slack connect channels with our high priority customers.  By default, threads are assigned to the CS person who owns the relationship with the customer.  If they need Support Hero assistance they will re-assign the thread accordingly.

#### Using Unthread

* The [Slack Unthread app](https://posthog.slack.com/archives/D04725CS7JR) will notify you if a conversation is assigned to you with a link to the relevant Slack thread.

* You can also see conversations which have been assigned to you in the Unthread app Home page.

* You can close a conversation by using the context menu either in the Unthread app Home page or the More Actions context menu in the Slack thread itself.  Adding a ✅ reaction to a thread will also mark it as closed (👀 will move it to in progress)

* You can also re-assign the conversation in the same way if you need (for example) a secondary person to take over.

* If you want to have an internal discussion about the thread away from the customer channel you can post a thread to the triage channel (currently #team-customer-success).

* Try and close conversations once resolved, so we can track MTTR for our high priority customers.

### Squeak!

Squeak! is a community curation toolkit created by the [Website & Docs team](/handbook/small-teams/website-docs). The ultimate goal of Squeak! is to support our customers and make our community self-sustaining.

#### Q&A.js by Squeak!

At the end of every page in the docs and handbook is a form where visitors can ask questions about the content of that page. (It also appears on the pricing page, and will be used in other places in the future.) This is an embedded JavaScript snippet we call [Q&A.js](https://squeak.posthog.com/toolkit/qna.js), powered by Squeak!

Squeak questions appear in Zendesk.

#### Answering questions using Squeak!

When a question is posted, it'll appear in Zendesk with a link to Squeak. A notification is also sent to the [#squeak-ping](https://posthog.slack.com/archives/C03B04XGLAZ) channel in Slack. You can answer a question directly on the page where it was asked. When a reply is posted, the person who asked the question will receive an email notification.

The first time you answer a question, you'll need to create a Squeak! account. (You'll be prompted to do this after answering a question, as posting/responding requires authentication.)

> **Important:** Do not sign up directly on squeak.cloud. Start by answering a question on the site - this creates an account within PostHog's Squeak! Cloud account. (As an alternate, you can ask an existing admin to invite you.) (Signing up directly on squeak.cloud creates a new account for you to use Squeak! on another site, which isn't what we want.)

Ask in [#squeak-ping](https://posthog.slack.com/archives/C03B04XGLAZ) to be upgraded to a moderator. This will also give you access to the [admin panel](https://squeak.posthog.com/toolkit/discussion-warehouse/) hosted on [squeak.cloud](https://squeak.cloud) to manage questions with moderator controls.

_Note: Squeak! currently uses a separate authentication system from PostHog Cloud. There are [plans](https://github.com/PostHog/squeak/issues/112) to support other types of authentication so a visitor doesn't have to create a separate account for asking questions._

## 2. Secondary on-call

Every team has a Secondary on-call rotation. Unlike support hero, you are still expected to do feature work. During the week that you are on-call, you are responsible for prioritizing and solving escalated issues, sentry errors and alerts that happen within your team. It also means helping out the support hero where necessary.

### Schedules

- [Secondary - Product Analytics](https://posthog.pagerduty.com/schedules#PXUZ9XL)
- [Secondary - Experimentation](https://posthog.pagerduty.com/schedules#P04FUTJ)
- [Secondary - Session recordings](https://posthog.pagerduty.com/schedules#PUPERAV)
- [Secondary – Pipeline](https://posthog.pagerduty.com/schedules#PM8YSH8)
- [Secondary - Infrastructure](https://posthog.pagerduty.com/schedules#P78OOWZ)

PagerDuty doesn't let us have a rotation that automatically selects the person that is support hero to also be the secondary on-call for their team. This means we'll occasionally need to manually shuffle the schedule around.
