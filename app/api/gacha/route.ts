import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { drawSprite } from '@/lib/gacha/draw';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 从 Authorization header 取 Bearer token（客户端匿名登录后传入）
    const authHeader = request.headers.get('authorization') ?? '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 用 service client + token 验证用户身份
    const supabase = createServiceClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

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
