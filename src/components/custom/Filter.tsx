import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CiFilter } from "react-icons/ci";
import { DualSlider } from '@/components'


const Filter = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="capitalize">
                    <CiFilter className="w-5 h-5" />
                    filter
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" side="right" sideOffset={4}>
                <div className="flex flex-col gap-8">
                    {/* Brand options */}
                    <div className="flex flex-col gap-2">
                        <header>
                            <Label>Brand</Label>
                        </header>
                        <div>
                            <Badge variant="outline">Brand Badge</Badge>
                            <Badge variant="outline">Brand Badge</Badge>
                            <Badge variant="outline">Brand Badge</Badge>
                            <Badge variant="outline">Brand Badge</Badge>
                            <Badge variant="outline">Brand Badge</Badge>
                            <Badge variant="outline">Brand Badge</Badge>
                        </div>
                    </div>

                    <div className="divider"></div>

                    {/* Price options */}
                    <div className="flex flex-col gap-2">
                        <header>
                            <Label>Price</Label>
                        </header>
                        <div>
                            <DualSlider />
                        </div>
                    </div>

                    {/* Price slider */}
                    <div className="flex flex-col gap-2">
                        <header>
                            <Label>Price</Label>
                        </header>
                        <div>
                            <Badge variant="outline">10M - 15M</Badge>
                            <Badge variant="outline">10M - 15M</Badge>
                            <Badge variant="outline">10M - 15M</Badge>
                            <Badge variant="outline">10M - 15M</Badge>
                            <Badge variant="outline">10M - 15M</Badge>
                            <Badge variant="outline">10M - 15M</Badge>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default Filter