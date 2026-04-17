import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { drawSprite } from '@/lib/gacha/draw';

export async function POST(): Promise<NextResponse> {
  try {
    // 验证登录态（anon 用户也算有效 session）
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sprite = await drawSprite(user.id);

    return NextResponse.json({
      result: {
        sprite,
        rarity: sprite.rarity,
      },
    });
  } catch (err) {
    console.error('[gacha/route] unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
