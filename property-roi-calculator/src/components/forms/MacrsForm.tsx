import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { usePropertyStore } from '../../store/usePropertyStore';
import type { MACRSCategory, MACRSItem } from '../../types/property';
import { Plus, Trash2, Calculator } from 'lucide-react';

const categories: MACRSCategory[] = ['27.5-year', '15-year', '7-year', '5-year', '3-year', '1-year'];

// Suggested item base names by category from the n8n workflow
const suggestedBaseNames: Record<MACRSCategory, string[]> = {
  '27.5-year': [
    'Windows & Install',
    'Glass Block Windows & Install',
    'Electrical & Install',
    'Plumbing & Install',
    'Shingle Roof Replacement Sq Ft',
    'HVAC Systems & Install',
    'Concrete, Blacktop',
    'Doors',
    'Framing',
    'Drywall',
    'Supplies - Other',
  ],
  '15-year': [
    'Landscaping, Tree Removal',
    'Pressure Washing & Deck Staining',
    'Tile - Material & Install',
  ],
  '7-year': [
    'Fencing - Signage & Install',
    'Hardwood Floor Refinishing',
    'Hot Water Tank',
    'Security Cameras & Install',
    'Light Fixtures',
    'Cabinets',
    'Counter-Tops',
    'Toilets',
    'Faucets',
    'Shower &  Tub Faucets',
    'Sinks / Cut Out granite',
    'Vanities',
    'Mailboxes',
  ],
  '5-year': [
    'Unit Turns',
    'Common Areas',
    'Equipment Rental',
    'Furniture & Equipment',
    'Roof Repair',
    'Carpet & Install',
    'Flooring & Install',
    'Tub & Shower Refinishing',
    'Window AC Units',
    'Through Wall AC Units',
    'Refrigerators',
    'Ranges',
    'Microwaves',
    'Laundry Machines',
    'Dishwashers',
    'Garbage Disposals',
    'Range Hoods',
    'Door Closers',
    'Door Knobs/Handles, Locks',
    'Vinyl Flooring & Install',
    'Paint',
    'Supplies - Other',
  ],
  '3-year': [],
  '1-year': [],
};

type SuggestedState = Record<string, { unitCost: number; quantity: number }>;

export const MacrsForm: React.FC = () => {
  const { analysis, updateCapitalExpenditures, goToNextStep } = usePropertyStore();
  const [selectedCategory, setSelectedCategory] = useState<MACRSCategory>('27.5-year');
  const [items, setItems] = useState<MACRSItem[]>(analysis.capitalExpenditures?.items || []);
  const [suggested, setSuggested] = useState<SuggestedState>({});

  const totalsByCategory = useMemo(() => {
    const totals: Record<MACRSCategory, number> = {
      '27.5-year': 0, '15-year': 0, '7-year': 0, '5-year': 0, '3-year': 0, '1-year': 0,
    };
    items.forEach(i => { totals[i.category] += i.totalCost; });
    return totals;
  }, [items]);

  // Ensure suggested state has keys for current category items
  useEffect(() => {
    const names = suggestedBaseNames[selectedCategory] || [];
    setSuggested(prev => {
      const next = { ...prev } as SuggestedState;
      names.forEach(n => {
        if (!next[n]) next[n] = { unitCost: 0, quantity: 0 };
      });
      return next;
    });
  }, [selectedCategory]);

  const addItem = () => {
    const newItem: MACRSItem = {
      id: crypto.randomUUID(),
      description: '',
      unitCost: 0,
      quantity: 1,
      totalCost: 0,
      category: selectedCategory,
    };
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, patch: Partial<MACRSItem>) => {
    setItems(prev => prev.map(i => {
      if (i.id !== id) return i;
      const next = { ...i, ...patch } as MACRSItem;
      const qty = Number(next.quantity) || 0;
      const unit = Number(next.unitCost) || 0;
      next.totalCost = qty * unit;
      return next;
    }));
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCapitalExpenditures(items);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Capital Expenditures (MACRS)
          </CardTitle>
          <CardDescription>
            Select a MACRS category and add cost-recovery items. Sections appear dynamically based on category.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="macrsCategory">MACRS Category</Label>
              <select
                id="macrsCategory"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as MACRSCategory)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Total for selected category</Label>
              <div className="h-10 flex items-center px-3 rounded-md border bg-muted text-sm">
                ${totalsByCategory[selectedCategory].toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Items ({selectedCategory})</h3>
            <Button type="button" onClick={addItem} className="gradient-primary text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Item
            </Button>
          </div>

          <div className="space-y-3">
            {items.filter(i => i.category === selectedCategory).map(item => (
              <div key={item.id} className="grid grid-cols-12 gap-3 p-3 border rounded-lg">
                <div className="col-span-12 md:col-span-4 space-y-1">
                  <Label>Description</Label>
                  <Input value={item.description} onChange={e => updateItem(item.id, { description: e.target.value })} placeholder="e.g., Roof replacement" />
                </div>
                <div className="col-span-6 md:col-span-2 space-y-1">
                  <Label>Unit Cost</Label>
                  <Input type="number" value={item.unitCost} onChange={e => updateItem(item.id, { unitCost: Number(e.target.value) })} />
                </div>
                <div className="col-span-6 md:col-span-2 space-y-1">
                  <Label>Quantity</Label>
                  <Input type="number" value={item.quantity} onChange={e => updateItem(item.id, { quantity: Number(e.target.value) })} />
                </div>
                <div className="col-span-6 md:col-span-2 space-y-1">
                  <Label>Total</Label>
                  <div className="h-10 flex items-center px-3 rounded-md border bg-muted text-sm">
                    ${item.totalCost.toLocaleString()}
                  </div>
                </div>
                <div className="col-span-6 md:col-span-2 flex items-end justify-end">
                  <Button type="button" variant="outline" onClick={() => removeItem(item.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" /> Remove
                  </Button>
                </div>
              </div>
            ))}

            {items.filter(i => i.category === selectedCategory).length === 0 && (
              <p className="text-sm text-muted-foreground">No items yet in {selectedCategory}. Add your first item.</p>
            )}
          </div>

          {/* Suggested items based on n8n workflow fields */}
          {suggestedBaseNames[selectedCategory] && suggestedBaseNames[selectedCategory].length > 0 && (
            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-semibold">Suggested Items (from workflow)</h3>
              <div className="space-y-3">
                {suggestedBaseNames[selectedCategory].map(name => (
                  <div key={name} className="grid grid-cols-12 gap-3 p-3 border rounded-lg">
                    <div className="col-span-12 md:col-span-6 space-y-1">
                      <Label>Item</Label>
                      <div className="h-10 flex items-center px-3 rounded-md border bg-muted text-sm">{name}</div>
                    </div>
                    <div className="col-span-6 md:col-span-3 space-y-1">
                      <Label>Unit Cost</Label>
                      <Input type="number" value={suggested[name]?.unitCost ?? 0} onChange={e => setSuggested(s => ({ ...s, [name]: { ...(s[name]||{unitCost:0,quantity:0}), unitCost: Number(e.target.value) } }))} />
                    </div>
                    <div className="col-span-6 md:col-span-3 space-y-1">
                      <Label>Quantity</Label>
                      <Input type="number" value={suggested[name]?.quantity ?? 0} onChange={e => setSuggested(s => ({ ...s, [name]: { ...(s[name]||{unitCost:0,quantity:0}), quantity: Number(e.target.value) } }))} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button type="button" variant="outline" onClick={() => {
                  const additions: MACRSItem[] = [];
                  for (const n of suggestedBaseNames[selectedCategory]) {
                    const cfg = suggested[n];
                    if (!cfg) continue;
                    const unit = Number(cfg.unitCost)||0;
                    const qty = Number(cfg.quantity)||0;
                    if (unit > 0 && qty > 0) {
                      additions.push({
                        id: crypto.randomUUID(),
                        description: n,
                        unitCost: unit,
                        quantity: qty,
                        totalCost: unit * qty,
                        category: selectedCategory,
                      });
                    }
                  }
                  if (additions.length) setItems(prev => [...prev, ...additions]);
                }}>Add Selected to Items</Button>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button type="submit" className="gradient-primary text-white">Save and Continue</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default MacrsForm;
