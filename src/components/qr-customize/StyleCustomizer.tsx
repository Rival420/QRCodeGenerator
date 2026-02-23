/**
 * StyleCustomizer Component.
 *
 * Composes all customization controls into a single panel using tabs.
 * The user can fine-tune colors, shapes, gradient, size, and error correction
 * on top of their selected preset.
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ColorPicker } from "./ColorPicker";
import { DotStyleSelect } from "./DotStyleSelect";
import { CornerStyleSelect } from "./CornerStyleSelect";
import { GradientControls } from "./GradientControls";
import { SizeSlider } from "./SizeSlider";
import { ErrorCorrectionSelect } from "./ErrorCorrectionSelect";
import type { QRGeneratorOptions, GradientConfig } from "@/types/qr";

interface StyleCustomizerProps {
  /** Current merged options (preset + overrides). */
  options: QRGeneratorOptions;
  /** Callback to update custom overrides. */
  onOptionsChange: (overrides: Partial<QRGeneratorOptions>) => void;
  /** Whether a logo is currently set. */
  hasLogo: boolean;
}

/**
 * Tabbed customization panel for fine-tuning QR code appearance.
 * Tabs: Colors, Shapes, Advanced.
 */
export function StyleCustomizer({
  options,
  onOptionsChange,
  hasLogo,
}: StyleCustomizerProps) {
  const hasGradient = !!options.dotsOptions.gradient;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Aanpassen</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors">
          <TabsList className="w-full">
            <TabsTrigger value="colors" className="flex-1">
              Kleuren
            </TabsTrigger>
            <TabsTrigger value="shapes" className="flex-1">
              Vormen
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1">
              Geavanceerd
            </TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-4 pt-4">
            <ColorPicker
              id="dot-color"
              label="Puntkleur"
              value={options.dotsOptions.color}
              onChange={(color) =>
                onOptionsChange({
                  dotsOptions: { ...options.dotsOptions, color },
                })
              }
            />
            <ColorPicker
              id="bg-color"
              label="Achtergrondkleur"
              value={options.backgroundOptions.color}
              onChange={(color) =>
                onOptionsChange({
                  backgroundOptions: { color },
                })
              }
            />
            <ColorPicker
              id="corner-color"
              label="Hoekkleur"
              value={options.cornersSquareOptions.color}
              onChange={(color) =>
                onOptionsChange({
                  cornersSquareOptions: { ...options.cornersSquareOptions, color },
                  cornersDotOptions: { ...options.cornersDotOptions, color },
                })
              }
            />
            <Separator />
            <GradientControls
              enabled={hasGradient}
              gradient={options.dotsOptions.gradient}
              onToggle={(enabled) => {
                if (enabled) {
                  onOptionsChange({
                    dotsOptions: {
                      ...options.dotsOptions,
                      gradient: {
                        type: "linear",
                        rotation: Math.PI / 4,
                        colorStops: [
                          { offset: 0, color: options.dotsOptions.color },
                          { offset: 1, color: "#555555" },
                        ],
                      },
                    },
                  });
                } else {
                  onOptionsChange({
                    dotsOptions: {
                      ...options.dotsOptions,
                      gradient: undefined,
                    },
                  });
                }
              }}
              onChange={(gradient: GradientConfig) =>
                onOptionsChange({
                  dotsOptions: { ...options.dotsOptions, gradient },
                })
              }
            />
          </TabsContent>

          {/* Shapes Tab */}
          <TabsContent value="shapes" className="space-y-4 pt-4">
            <DotStyleSelect
              value={options.dotsOptions.type}
              onChange={(type) =>
                onOptionsChange({
                  dotsOptions: { ...options.dotsOptions, type },
                })
              }
            />
            <Separator />
            <CornerStyleSelect
              cornerSquareType={options.cornersSquareOptions.type}
              cornerDotType={options.cornersDotOptions.type}
              onCornerSquareChange={(type) =>
                onOptionsChange({
                  cornersSquareOptions: { ...options.cornersSquareOptions, type },
                })
              }
              onCornerDotChange={(type) =>
                onOptionsChange({
                  cornersDotOptions: { ...options.cornersDotOptions, type },
                })
              }
            />
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-4 pt-4">
            <SizeSlider
              value={options.width}
              onChange={(size) =>
                onOptionsChange({ width: size, height: size })
              }
            />
            <Separator />
            <ErrorCorrectionSelect
              value={options.qrOptions.errorCorrectionLevel}
              onChange={(errorCorrectionLevel) =>
                onOptionsChange({
                  qrOptions: { errorCorrectionLevel },
                })
              }
              hasLogo={hasLogo}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
