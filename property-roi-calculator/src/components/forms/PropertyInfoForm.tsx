import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertyInfoSchema } from '../../lib/validations';
import { usePropertyStore } from '../../store/usePropertyStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Home, MapPin, Ruler, Bed, Bath, Calendar } from 'lucide-react';
import type { PropertyInformation } from '../../types/property';

export const PropertyInfoForm: React.FC = () => {
  const { analysis, updatePropertyInfo, goToNextStep } = usePropertyStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyInformation>({
    resolver: zodResolver(propertyInfoSchema),
    defaultValues: analysis.propertyInfo || {},
  });

  const onSubmit = async (data: PropertyInformation) => {
    try {
      await fetch('https://primary-production-56087.up.railway.app/webhook/website-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch {}
    updatePropertyInfo(data);
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" />
            Property Details
          </CardTitle>
          <CardDescription>
            Enter the basic information about the property
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Address Section */}
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Street Address
                </Label>
                <Input
                  id="address"
                  {...register('address')}
                  placeholder="123 Main Street"
                  className={errors.address ? 'border-destructive' : ''}
                />
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register('city')}
                    placeholder="San Francisco"
                    className={errors.city ? 'border-destructive' : ''}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    {...register('state')}
                    placeholder="CA"
                    maxLength={2}
                    className={errors.state ? 'border-destructive' : ''}
                  />
                  {errors.state && (
                    <p className="text-sm text-destructive">{errors.state.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    {...register('zipCode')}
                    placeholder="94105"
                    className={errors.zipCode ? 'border-destructive' : ''}
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-destructive">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Property Specifications */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold">Property Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="squareFootage" className="flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  Square Footage
                </Label>
                <Input
                  id="squareFootage"
                  type="number"
                  {...register('squareFootage', { valueAsNumber: true })}
                  placeholder="1500"
                  className={errors.squareFootage ? 'border-destructive' : ''}
                />
                {errors.squareFootage && (
                  <p className="text-sm text-destructive">{errors.squareFootage.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearBuilt" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Year Built (Optional)
                </Label>
                <Input
                  id="yearBuilt"
                  type="number"
                  {...register('yearBuilt', { valueAsNumber: true })}
                  placeholder="2000"
                  className={errors.yearBuilt ? 'border-destructive' : ''}
                />
                {errors.yearBuilt && (
                  <p className="text-sm text-destructive">{errors.yearBuilt.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedrooms" className="flex items-center gap-2">
                  <Bed className="w-4 h-4" />
                  Bedrooms
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  {...register('bedrooms', { valueAsNumber: true })}
                  placeholder="3"
                  className={errors.bedrooms ? 'border-destructive' : ''}
                />
                {errors.bedrooms && (
                  <p className="text-sm text-destructive">{errors.bedrooms.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms" className="flex items-center gap-2">
                  <Bath className="w-4 h-4" />
                  Bathrooms
                </Label>
                <Input
                  id="bathrooms"
                  type="number"
                  step="0.5"
                  {...register('bathrooms', { valueAsNumber: true })}
                  placeholder="2"
                  className={errors.bathrooms ? 'border-destructive' : ''}
                />
                {errors.bathrooms && (
                  <p className="text-sm text-destructive">{errors.bathrooms.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type (Optional)</Label>
              <select
                id="propertyType"
                {...register('propertyType')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select a type...</option>
                <option value="single-family">Single Family</option>
                <option value="multi-family">Multi Family</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="gradient-primary text-white">
              Save and Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
