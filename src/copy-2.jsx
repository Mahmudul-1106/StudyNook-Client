 {/* Amenity Toggles Grid */}
                <div className="p-4 bg-slate-50/60 dark:bg-zinc-900/20 border border-slate-100 dark:border-zinc-900 rounded-xl">
                  <CheckboxGroup
                    isRequired
                    name="amenities"
                    className="flex flex-col gap-2"
                  >
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2 block">
                      Amenities & Space Inclusions
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[
                        { id: "whiteboard", label: "Whiteboard" },
                        { id: "projector", label: "Projector" },
                        { id: "wifi", label: "High-Speed Wi-Fi" },
                        { id: "power", label: "Power Outlets" },
                        { id: "quiet", label: "Quiet Zone" },
                        { id: "air", label: "Air Conditioning" },
                      ].map((item) => (
                        <Checkbox
                          key={item.id}
                          value={item.id}
                          className="cursor-pointer group flex items-center gap-2"
                        >
                          <Checkbox.Control className="border-slate-300 dark:border-zinc-700 data-[selected=true]:bg-cyan-600 data-[selected=true]:border-cyan-600 rounded-md transition-all shadow-xs" />
                          <Checkbox.Content>
                            <Label className="text-sm font-medium text-slate-700 dark:text-zinc-300 group-hover:text-slate-900 dark:group-hover:text-white cursor-pointer transition-colors">
                              {item.label}
                            </Label>
                          </Checkbox.Content>
                        </Checkbox>
                      ))}
                    </div>
                    <FieldError className="text-xs text-red-500 mt-2 font-medium" />
                  </CheckboxGroup>
                </div>
              </FieldGroup>