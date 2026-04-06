import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, firstName } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    const privateKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    const listId = process.env.KLAVIYO_LIST_ID;

    if (!privateKey || !listId) {
      return NextResponse.json(
        { error: 'Missing Klaviyo configuration.' },
        { status: 500 }
      );
    }

    const cleanEmail = email.trim();
    const cleanFirstName =
      typeof firstName === 'string' ? firstName.trim() : '';

    // 1) Create/update profile with first name
    const profileResponse = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${privateKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        revision: '2024-06-15',
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email: cleanEmail,
            ...(cleanFirstName ? { first_name: cleanFirstName } : {}),
          },
        },
      }),
    });

    const profileText = await profileResponse.text();
    let profileData: any = null;

    if (profileText) {
      try {
        profileData = JSON.parse(profileText);
      } catch {
        profileData = profileText;
      }
    }

    // 409 = profile already exists, that's okay for our flow
    if (!profileResponse.ok && profileResponse.status !== 409) {
      console.error('Klaviyo profile error:', profileData);

      return NextResponse.json(
        {
          error:
            profileData?.errors?.[0]?.detail ||
            'Failed to create/update profile.',
          raw: profileData,
        },
        { status: profileResponse.status }
      );
    }

    // 2) Subscribe email to list
    const subscribeResponse = await fetch(
      'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs',
      {
        method: 'POST',
        headers: {
          Authorization: `Klaviyo-API-Key ${privateKey}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          revision: '2024-06-15',
        },
        body: JSON.stringify({
          data: {
            type: 'profile-subscription-bulk-create-job',
            attributes: {
              custom_source: 'Find Your Perfect Psyllium Quiz',
              profiles: {
                data: [
                  {
                    type: 'profile',
                    attributes: {
                      email: cleanEmail,
                    },
                  },
                ],
              },
            },
            relationships: {
              list: {
                data: {
                  type: 'list',
                  id: listId,
                },
              },
            },
          },
        }),
      }
    );

    const subscribeText = await subscribeResponse.text();
    let subscribeData: any = null;

    if (subscribeText) {
      try {
        subscribeData = JSON.parse(subscribeText);
      } catch {
        subscribeData = subscribeText;
      }
    }

    if (!subscribeResponse.ok) {
      console.error('Klaviyo subscribe error:', subscribeData);

      return NextResponse.json(
        {
          error:
            subscribeData?.errors?.[0]?.detail ||
            'Klaviyo subscribe failed.',
          raw: subscribeData,
        },
        { status: subscribeResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      profile: profileData,
      subscribe: subscribeData,
    });
  } catch (error) {
    console.error('Subscribe route error:', error);

    return NextResponse.json(
      { error: 'Server error while subscribing.' },
      { status: 500 }
    );
  }
}