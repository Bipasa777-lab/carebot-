"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "../components/ui/card";

export default function EmergencyPage() {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    }, []);

    return (
        <main className="min-h-screen bg-red-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-md rounded-xl">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-red-700">🚑 Emergency Assistance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-700">Use the options below in case of a medical emergency.</p>

                    <a href="tel:112">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">📞 Call Emergency</Button>
                    </a>

                    {location && (
                        <iframe
                            title="Nearby Hospitals"
                            src={`https://www.google.com/maps?q=hospitals+near+${location.lat},${location.lng}&z=15&output=embed`}
                            className="w-full h-80 rounded-lg border"
                            loading="lazy"
                            allowFullScreen
                        />
                    )}
                </CardContent>
            </Card>
        </main>
    );
}