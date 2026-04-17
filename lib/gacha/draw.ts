import type { Rarity, Sprite } from '@/types';
import { createServiceClient } from '@/lib/supabase/server';
import { RARITY_WEIGHTS, TOTAL_WEIGHT } from './weights';

/** 加权随机，返回对应稀有度 */
export function rollRarity(): Rarity {
  const roll = Math.floor(Math.random() * TOTAL_WEIGHT); // [0, 10000)
  let cumulative = 0;

  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS) as [Rarity, number][]) {
    cumulative += weight;
    if (roll < cumulative) {
      return rarity;
    }
  }

  // 理论上不会到达此处，保底返回 N
  return 'N';
}

/**
 * 为指定用户执行一次抽卡：
 * 1. 随机确定稀有度
 * 2. 从 sprites 表随机取该稀有度的一条记录
 * 3. 写入 gacha_pulls
 * 4. 返回精灵数据
 */
export async function drawSprite(userId: string): Promise<Sprite> {
  const rarity = rollRarity();
  const supabase = createServiceClient();

  // 先取该稀有度的总数量
  const { count, error: countError } = await supabase
    .from('sprites')
    .select('*', { count: 'exact', head: true })
    .eq('rarity', rarity);

  if (countError) throw countError;
  if (!count || count === 0) {
    throw new Error(`No sprites found for rarity: ${rarity}`);
  }

  // 随机偏移量，避免 ORDER BY random() 全表扫描
  const offset = Math.floor(Math.random() * count);

  const { data: sprites, error: selectError } = await supabase
    .from('sprites')
    .select('*')
    .eq('rarity', rarity)
    .range(offset, offset);

  if (selectError) throw selectError;
  if (!sprites || sprites.length === 0) {
    throw new Error(`Failed to fetch sprite at offset ${offset} for rarity: ${rarity}`);
  }

  const sprite = sprites[0] as Sprite;

  // 记录抽卡结果
  const { error: insertError } = await supabase
    .from('gacha_pulls')
    .insert({ user_id: userId, sprite_id: sprite.id, rarity });

  if (insertError) throw insertError;

  return sprite;
}
